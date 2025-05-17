package br.com.sysprospect.application.mappers.users

import br.com.sysprospect.application.mappers.IMapper
import br.com.sysprospect.application.models.users.UserViewModel
import br.com.sysprospect.domain.entities.UserEntity
import org.springframework.stereotype.Component

@Component
class UserViewMapper: IMapper<UserEntity, UserViewModel> {
    override fun map(t: UserEntity): UserViewModel {
        return UserViewModel(
            id = t.id,
            name = t.name,
            username = t.username,
            email = t.email,
            createdAt = t.createdAt
        )
    }
}