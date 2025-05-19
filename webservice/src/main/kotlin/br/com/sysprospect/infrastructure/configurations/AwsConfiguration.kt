package br.com.sysprospect.infrastructure.configurations

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.sns.SnsClient
import java.net.URI

@Configuration
class AwsConfiguration(
    private val awsProperties: AwsProperties
) {

    @Bean
    fun snsClient(): SnsClient {
        val credentials = AwsBasicCredentials.create(awsProperties.accessKey, awsProperties.secretKey)

        var client = SnsClient.builder()
            .credentialsProvider(StaticCredentialsProvider.create(credentials))
            .region(Region.of(awsProperties.region))

        if (awsProperties.endPoint.isNotEmpty())
            client.endpointOverride(URI.create(awsProperties.endPoint))

        return client.build()
    }
}