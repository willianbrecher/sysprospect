package br.com.sysprospect.application.models.leads

import java.util.UUID

data class LeadFormUpdateModel(
    val id: UUID,
    val name: String,
    val email: String,
    val phone: String,
)