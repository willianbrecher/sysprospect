package br.com.sysprospect.domain.commons

import jakarta.persistence.Id
import jakarta.persistence.MappedSuperclass
import java.time.LocalDateTime
import java.util.UUID

@MappedSuperclass
abstract class CommonEntity(
    @Id
    val id: UUID = UUID.randomUUID(),
    val createdAt: LocalDateTime = LocalDateTime.now()
)