package br.com.sysprospect.domain.repositories

import br.com.sysprospect.domain.entities.UserEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface IUserRepository: JpaRepository<UserEntity, UUID> {
    fun findByName(name: String, pageable: Pageable): Page<UserEntity>
}