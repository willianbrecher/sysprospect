package br.com.sysprospect.application.models.leads

import br.com.sysprospect.domain.enums.HowKnowAbout
import java.util.UUID

data class LeadFormUpdateModel(
    val id: UUID,
    val name: String,
    val email: String,
    val phone: String,
    val knowAbout: HowKnowAbout
)