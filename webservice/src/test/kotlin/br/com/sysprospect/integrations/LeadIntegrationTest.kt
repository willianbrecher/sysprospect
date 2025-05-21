package br.com.sysprospect.integrations

import br.com.sysprospect.application.models.leads.LeadFormCreateModel
import br.com.sysprospect.domain.entities.LeadEntity
import br.com.sysprospect.domain.enums.HowKnowAbout
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers

@Testcontainers
@SpringBootTest
@AutoConfigureMockMvc
class LeadIntegrationTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    companion object {
        @Container
        val postgresContainer = PostgreSQLContainer<Nothing>("postgres:latest").apply {
            withDatabaseName("testdb")
            withUsername("test")
            withPassword("test")
        }

        @JvmStatic
        @DynamicPropertySource
        fun overrideProperties(registry: DynamicPropertyRegistry) {
            registry.add("spring.datasource.url", postgresContainer::getJdbcUrl)
            registry.add("spring.datasource.username", postgresContainer::getUsername)
            registry.add("spring.datasource.password", postgresContainer::getPassword)
        }
    }

    @Test
    fun `should register a lead successfully`() {
        val leadForm = LeadFormCreateModel(
            name = "Test Lead",
            email = "test@test.com",
            phone = "554500001111",
            knowAbout = HowKnowAbout.OTHER
        )

        mockMvc.post("/api/register") {
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

    @Test
    fun `should register a lead that already exists and must increment amount`() {
        val leadForm = LeadFormCreateModel(
            name = "Test Lead 3",
            email = "test@test3.com",
            phone = "554500001113",
            knowAbout = HowKnowAbout.OTHER
        )

        mockMvc.post("/api/register") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(leadForm)
        }.andExpect {
            status { isOk() }
        }

        mockMvc.get("/api/leads/by-email/{email}", "test@test3.com")
            .andExpect {
                status { isOk() }
                jsonPath("$.name") { value("Test Lead 3") }
                jsonPath("$.email") { value("test@test3.com") }
                jsonPath("$.phone") { value("554500001113") }
                jsonPath("$.knowAbout") { value(HowKnowAbout.OTHER.toString()) }
                jsonPath("$.amount") { value(1) }
            }
    }

    @Test
    fun `should register a lead and consult by id`() {
        val leadForm = LeadFormCreateModel(
            name = "Test Lead 2",
            email = "test@test2.com",
            phone = "554500001112",
            knowAbout = HowKnowAbout.OTHER
        )

        val response = mockMvc.post("/api/register") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(leadForm)
        }.andExpect {
            status { isOk() }
        }.andReturn()

        val lead = objectMapper.readValue(response.response.contentAsString, LeadEntity::class.java)

        mockMvc.get("/api/leads/{id}", lead.id.toString())
            .andExpect {
                status { isOk() }
                jsonPath("$.name") { value("Test Lead 2") }
                jsonPath("$.email") { value("test@test2.com") }
                jsonPath("$.phone") { value("554500001112") }
                jsonPath("$.knowAbout") { value(HowKnowAbout.OTHER.toString()) }
                jsonPath("$.amount") { value(1) }
            }
    }

    @Test
    fun `should register a lead and consult by email`() {
        val leadForm = LeadFormCreateModel(
            name = "Test Lead 4",
            email = "test@test4.com",
            phone = "554500001114",
            knowAbout = HowKnowAbout.OTHER
        )

        mockMvc.post("/api/register") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(leadForm)
        }.andExpect {
            status { isOk() }
        }

        mockMvc.get("/api/leads/by-email/{email}", "test@test4.com")
            .andExpect {
                status { isOk() }
                jsonPath("$.name") { value("Test Lead 4") }
                jsonPath("$.email") { value("test@test4.com") }
                jsonPath("$.phone") { value("554500001114") }
                jsonPath("$.knowAbout") { value(HowKnowAbout.OTHER.toString()) }
                jsonPath("$.amount") { value(1) }
            }
    }
}