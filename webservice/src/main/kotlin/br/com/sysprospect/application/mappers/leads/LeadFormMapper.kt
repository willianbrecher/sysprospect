package br.com.sysprospect.application.mappers.leads

import br.com.sysprospect.application.mappers.IMapper
import br.com.sysprospect.application.models.leads.LeadFormCreateModel
import br.com.sysprospect.application.models.leads.LeadFormUpdateModel
import br.com.sysprospect.domain.entities.LeadEntity
import org.springframework.stereotype.Component

@Component
class LeadFormMapper: IMapper<LeadFormCreateModel, LeadEntity> {
    override fun map(t: LeadFormCreateModel): LeadEntity {
        return LeadEntity(
            name = t.name,
            email = t.email,
            phone = t.phone,
            knowAbout = t.knowAbout,
            amount = 1
        )
    }
}