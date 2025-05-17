package br.com.sysprospect.application.models.leads

import br.com.sysprospect.HowKnowAbout
import java.time.LocalDateTime
import java.util.UUID

data class LeadViewModel(
    val id: UUID,
    val name: String,
    val email: String,
    val phone: String,
    val amount: Int,
    val knowAbout: HowKnowAbout,
    val about: String?,
    val createdAt: LocalDateTime
)