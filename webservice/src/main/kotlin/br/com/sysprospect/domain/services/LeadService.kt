package br.com.sysprospect.domain.services

import br.com.sysprospect.application.exceptions.NotFoundException
import br.com.sysprospect.application.mappers.leads.LeadFormMapper
import br.com.sysprospect.application.mappers.leads.LeadViewMapper
import br.com.sysprospect.application.models.LeadTopicModel
import br.com.sysprospect.application.models.leads.LeadFormCreateModel
import br.com.sysprospect.application.models.leads.LeadFormUpdateModel
import br.com.sysprospect.application.models.leads.LeadViewModel
import br.com.sysprospect.domain.repositories.ILeadRepository
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class LeadService(
    private val leadRepository: ILeadRepository,
    private val leadViewMapper: LeadViewMapper,
    private val leadFormMapper: LeadFormMapper,
    private val snsService: SnsService,
    private val objectMapper: ObjectMapper
) {
    fun create(form: LeadFormCreateModel): LeadViewModel{
        val lead = leadFormMapper.map(form)

        leadRepository.findByNameAndPhoneAndEmail(lead.name,lead.phone,lead.email).ifPresentOrElse(
            { value ->
                value.incrementAmount()
                leadRepository.save(value)
            },
            {
                leadRepository.save(lead)
            }
        )

        snsService.publish(objectMapper.writeValueAsString(LeadTopicModel(lead.name,lead.email,lead.amount)))

        return leadViewMapper.map(lead)
    }

    fun update(id: UUID, form: LeadFormUpdateModel): LeadViewModel{
        val lead = leadRepository.findById(form.id)
            .orElseThrow{NotFoundException("Lead not found!")}

        lead.name = form.name
        lead.phone = form.phone
        lead.email = form.email
        lead.knowAbout = form.knowAbout

        leadRepository.save(lead)

        return leadViewMapper.map(lead)
    }

    fun delete(id: UUID){
        val lead = leadRepository.findById(id)
            .orElseThrow{NotFoundException("Lead not found!")}
        leadRepository.delete(lead)
    }

    fun findById(id: UUID): LeadViewModel{
        val lead = leadRepository.findById(id)
            .orElseThrow{NotFoundException("Lead not found!")}
        return leadViewMapper.map(lead)
    }

    fun findByEmail(email: String): LeadViewModel{
        val lead = leadRepository.findByEmail(email)
            .orElseThrow{NotFoundException("Lead not found!")}
        return leadViewMapper.map(lead)
    }

    fun list(filter: String?, pageable: Pageable): Page<LeadViewModel> {
        val leads = if (filter.isNullOrEmpty()) {
            leadRepository.findAll(pageable)
        } else {
            leadRepository.findByFilter(filter, pageable)
        }
        return leads.map { u -> leadViewMapper.map(u)}
    }
}