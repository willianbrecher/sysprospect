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
    val name: String,
    @NotNull
    @Column(unique = true)
    val username: String,
    val password: String,
    @NotNull
    val email: String
): CommonEntity()