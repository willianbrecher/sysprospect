package br.com.sysprospect.domain.services

import br.com.sysprospect.application.mappers.leads.LeadFormMapper
import br.com.sysprospect.application.mappers.leads.LeadViewMapper
import br.com.sysprospect.application.models.leads.LeadFormCreateModel
import br.com.sysprospect.application.models.leads.LeadFormUpdateModel
import br.com.sysprospect.application.models.leads.LeadViewModel
import br.com.sysprospect.domain.repositories.ILeadRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class LeadService(
    private val leadRepository: ILeadRepository,
    private val leadViewMapper: LeadViewMapper,
    private val leadFormMapper: LeadFormMapper
) {
    fun create(form: LeadFormCreateModel): LeadViewModel{
        val lead = leadFormMapper.map(form)

        leadRepository.findByNameAndPhoneAndEmail(lead.name,lead.phone,lead.email).ifPresentOrElse(
            { value ->
                value.amount += 1
                leadRepository.save(value)
            },
            {
                leadRepository.save(lead)
            }
        )

        return leadViewMapper.map(lead)
    }

    fun update(form: LeadFormUpdateModel): LeadViewModel{
        val lead = leadRepository.findById(form.id).orElseThrow(
            //TODO - implementar retorno nulo
        )

        lead.name = form.name
        lead.email = form.email
        lead.phone = form.phone

        leadRepository.save(lead)

        return leadViewMapper.map(lead)
    }

    fun delete(id: UUID){
        val lead = leadRepository.findById(id).orElseThrow(
            //TODO - implementar retorno nulo
        )
        leadRepository.delete(lead)
    }

    fun findById(id: UUID): LeadViewModel{
        val lead = leadRepository.findById(id).orElseThrow(
            //TODO - implementar retorno nulo
        )
        return leadViewMapper.map(lead)
    }

    fun list(name: String?, pageable: Pageable): Page<LeadViewModel> {
        val leads = if (name.isNullOrEmpty()) {
            leadRepository.findAll(pageable)
        } else {
            leadRepository.findByName(name, pageable)
        }
        return leads.map { u -> leadViewMapper.map(u)}
    }
}