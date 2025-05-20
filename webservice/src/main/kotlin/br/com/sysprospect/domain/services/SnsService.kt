package br.com.sysprospect.domain.services

import br.com.sysprospect.application.models.LeadTopicModel
import br.com.sysprospect.infrastructure.configurations.AwsProperties
import org.springframework.stereotype.Service
import software.amazon.awssdk.services.sns.SnsClient
import software.amazon.awssdk.services.sns.model.PublishRequest

@Service
class SnsService(
    private val snsClient: SnsClient,
    private val awsProperties: AwsProperties
) {

    fun publish(message: String){
        if (awsProperties.enabled) {
            val request = PublishRequest.builder()
                .topicArn(awsProperties.snsTopic)
                .message(message)
                .build()

            snsClient.publish(request)
        }
    }
}