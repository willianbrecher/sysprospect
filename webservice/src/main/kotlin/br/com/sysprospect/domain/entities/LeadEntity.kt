package br.com.sysprospect.domain.entities

import br.com.sysprospect.domain.enums.HowKnowAbout
import br.com.sysprospect.domain.commons.CommonEntity
import jakarta.persistence.Entity
import jakarta.persistence.Table
import org.jetbrains.annotations.NotNull

@Entity
@Table(name = "leads", schema = "application")
data class LeadEntity(
    @NotNull
    var name: String,
    @NotNull
    var email: String,
    @NotNull
    var phone: String,
    @NotNull
    var amount: Int,
    @NotNull
    val knowAbout: HowKnowAbout,
): CommonEntity()