package com.andi.rest_crud.service

import com.andi.rest_crud.domain.User
import com.andi.rest_crud.dto.CurrentUserResponse
import com.andi.rest_crud.dto.LoginRequest
import com.andi.rest_crud.dto.TokenResponse
import com.andi.rest_crud.dto.UserSignUpRequest
import com.andi.rest_crud.exception.InvalidCredentialsException
import com.andi.rest_crud.exception.UserAlreadyExistsException
import com.andi.rest_crud.repository.UserRepository
import com.andi.rest_crud.security.JwtTokenProvider
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtTokenProvider: JwtTokenProvider
) {

    fun signUp(request: UserSignUpRequest) {
        // TODO 1. signUp에서 입력 정리, 중복 확인, 사용자 생성이 한 메서드에 어떻게 섞여 있는지 먼저 읽어보세요.
        // TODO 2. 가장 먼저 분리할 책임이 무엇인지 정하고 private helper로 빼보세요.
        val email = requireNotNull(request.email)
        val rawPassword = requireNotNull(request.password)
        val encodedPassword = requireNotNull(passwordEncoder.encode(rawPassword))

        if (userRepository.existsByEmail(email)) {
            throw UserAlreadyExistsException(email)
        }

        userRepository.save(
            User(
                email = email,
                password = encodedPassword
            )
        )
    }

    fun login(request: LoginRequest): TokenResponse {
        // TODO 3. login에서 이메일 정리, 조회, 비밀번호 검증, 토큰 발급 책임을 분리해보세요.
        // TODO 4. 기능을 바꾸기보다 흐름이 더 빨리 읽히는지를 기준으로 정리하세요.
        val email = requireNotNull(request.email)
        val rawPassword = requireNotNull(request.password)
        val user = userRepository.findByEmail(email)
            .orElseThrow { InvalidCredentialsException() }

        if (!passwordEncoder.matches(rawPassword, requireNotNull(user.password))) {
            throw InvalidCredentialsException()
        }

        return TokenResponse(
            accessToken = jwtTokenProvider.createToken(requireNotNull(user.email))
        )
    }

    fun getCurrentUser(email: String): CurrentUserResponse {
        // TODO 5. 현재 사용자가 없을 때 같은 예외를 계속 쓰는 것이 맞는지 생각해보세요.
        // TODO 6. 필요하면 더 설명적인 예외를 추가하고 handler까지 연결해보세요.
        val user = userRepository.findByEmail(email)
            .orElseThrow { InvalidCredentialsException() }

        return CurrentUserResponse(email = requireNotNull(user.email))
    }
}
