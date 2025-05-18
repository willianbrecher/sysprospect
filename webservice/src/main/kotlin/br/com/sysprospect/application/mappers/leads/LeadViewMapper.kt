package br.com.sysprospect.application.mappers.leads

import br.com.sysprospect.application.mappers.IMapper
import br.com.sysprospect.application.models.leads.LeadViewModel
import br.com.sysprospect.domain.entities.LeadEntity
import org.springframework.stereotype.Component

@Component
class LeadViewMapper: IMapper<LeadEntity, LeadViewModel> {
    override fun map(t: LeadEntity): LeadViewModel {
        return LeadViewModel(
            id = t.id,
            name = t.name,
            phone = t.phone,
            email = t.email,
            amount = t.amount,
            knowAbout = t.knowAbout,
            createdAt = t.createdAt
        )
    }
}