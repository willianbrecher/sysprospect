package br.com.sysprospect.application.models.users

import java.time.LocalDateTime
import java.util.UUID

data class UserViewModel(
    val id: UUID,
    val name: String,
    val username: String,
    val email: String,
    val createdAt: LocalDateTime
)