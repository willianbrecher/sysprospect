package br.com.sysprospect.application.mappers.leads

import br.com.sysprospect.application.mappers.IMapper
import br.com.sysprospect.application.models.leads.LeadFormModel
import br.com.sysprospect.domain.entities.LeadEntity
import org.springframework.stereotype.Component

@Component
class LeadFormMapper: IMapper<LeadFormModel, LeadEntity> {
    override fun map(t: LeadFormModel): LeadEntity {
        return LeadEntity(
            id = t.id,
            name = t.name,
            email = t.email,
            phone = t.phone,

        )
    }
}