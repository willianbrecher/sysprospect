package br.com.sysprospect.application.models.leads

import br.com.sysprospect.domain.enums.HowKnowAbout

data class LeadFormCreateModel(
    val name: String,
    val email: String,
    val phone: String,
    val knowAbout: HowKnowAbout,
)