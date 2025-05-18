package br.com.sysprospect.domain.entities

import br.com.sysprospect.domain.commons.CommonEntity
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table
import org.jetbrains.annotations.NotNull

@Entity
@Table(name ="users", schema = "application")
data class UserEntity(

    @NotNull
    var name: String,
    @NotNull
    @Column(unique = true)
    val username: String,
    var password: String,
    @NotNull
    var email: String
): CommonEntity()