package br.com.sysprospect.domain.repositories

import br.com.sysprospect.domain.entities.LeadEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.Optional
import java.util.UUID

@Repository
interface ILeadRepository: JpaRepository<LeadEntity, UUID>{

    @Query("from LeadEntity l where application.filter(:filter, l.name, l.email, l.phone) = true")
    fun findByFilter(filter: String, pageable: Pageable): Page<LeadEntity>

    fun findByNameAndPhoneAndEmail(name: String, phone: String, email: String): Optional<LeadEntity>

    fun findByEmail(email: String): Optional<LeadEntity>
}