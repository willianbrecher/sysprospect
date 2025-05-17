package br.com.sysprospect.application.models.leads

import br.com.sysprospect.HowKnowAbout
import java.util.UUID

data class LeadFormModel(
    val id: UUID?,
    val name: String,
    val email: String,
    val phone: String,
    val knowAbout: HowKnowAbout,
    val about: String?
)