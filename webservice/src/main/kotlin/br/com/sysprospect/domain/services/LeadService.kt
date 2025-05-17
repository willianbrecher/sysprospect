package br.com.sysprospect.domain.services

import br.com.sysprospect.application.mappers.leads.LeadViewMapper
import br.com.sysprospect.application.models.leads.LeadFormModel
import br.com.sysprospect.application.models.leads.LeadViewModel
import br.com.sysprospect.domain.repositories.ILeadRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class LeadService(
    private val leadRepository: ILeadRepository,
    private val leadViewMapper: LeadViewMapper
) {
    fun create(form: LeadFormModel){

    }

    fun update(form: LeadFormModel){

    }

    fun findById(id: UUID){

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