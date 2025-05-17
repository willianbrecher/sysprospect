package br.com.sysprospect.domain.entities

import br.com.sysprospect.HowKnowAbout
import br.com.sysprospect.domain.commons.CommonEntity
import jakarta.persistence.Entity
import jakarta.persistence.Table
import org.jetbrains.annotations.NotNull

@Entity
@Table(name = "leads", schema = "application")
data class LeadEntity(
    @NotNull
    val name: String,
    @NotNull
    val email: String,
    @NotNull
    val phone: String,
    @NotNull
    val amount: Int,
    @NotNull
    val knowAbout: HowKnowAbout,
    val about: String?
): CommonEntity()