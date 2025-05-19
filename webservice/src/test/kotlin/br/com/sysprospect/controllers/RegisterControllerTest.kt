package br.com.sysprospect.controllers

import br.com.sysprospect.application.models.leads.LeadFormCreateModel
import br.com.sysprospect.application.models.leads.LeadViewModel
import br.com.sysprospect.domain.enums.HowKnowAbout
import br.com.sysprospect.domain.services.LeadService
import com.fasterxml.jackson.databind.ObjectMapper
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.post
import java.time.LocalDateTime
import java.util.*
import kotlin.test.BeforeTest

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RegisterControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @Autowired
    private lateinit var leadService: LeadService

    @BeforeTest
    fun setup() {
        leadService = mockk<LeadService>()
    }

    @Test
    fun `should register a lead successfully`() {
        val leadForm = LeadFormCreateModel(
            name = "Test Lead",
            email = "test@test.com",
            phone = "554500001111",
            knowAbout = HowKnowAbout.OTHER
        )

        val response = LeadViewModel(
            id = UUID.randomUUID(),
            name = leadForm.name,
            email = leadForm.email,
            phone = leadForm.phone,
            knowAbout = leadForm.knowAbout,
            amount = 1,
            createdAt = LocalDateTime.now()
        )

        every { leadService.create(leadForm) } returns response

        mockMvc.post("/api/leads") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(leadForm)
        }.andExpect {
            status { isOk() }
            content { contentType(MediaType.APPLICATION_JSON) }
            jsonPath("$.name") { value("Test Lead") }
            jsonPath("$.email") { value("test@test.com") }
            jsonPath("$.phone") { value("554500001111") }
            jsonPath("$.knowAbout") { value(HowKnowAbout.OTHER.toString()) }
            jsonPath("$.amount") { value(1) }
        }
    }
}