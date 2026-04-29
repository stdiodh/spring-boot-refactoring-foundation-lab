package com.andi.rest_crud.service

import com.andi.rest_crud.exception.InvalidCredentialsException
import com.andi.rest_crud.repository.UserRepository
import com.andi.rest_crud.security.JwtTokenProvider
import com.andi.rest_crud.security.PasswordConfig
import com.andi.rest_crud.support.TestFixtureFactory
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import java.util.Optional

class AuthServiceTest {

    private val userRepository: UserRepository = mock(UserRepository::class.java)
    private val passwordEncoder = PasswordConfig().passwordEncoder()
    private val jwtTokenProvider = JwtTokenProvider(
        secret = "change-this-secret-for-sequence-04-change-this-secret",
        expirationMs = 3600000L
    )
    private val authService = AuthService(
        userRepository = userRepository,
        passwordEncoder = passwordEncoder,
        jwtTokenProvider = jwtTokenProvider
    )

    @Test
    fun `login은 올바른 이메일과 비밀번호면 access token을 만든다`() {
        val request = TestFixtureFactory.loginRequest()
        val encodedPassword = requireNotNull(passwordEncoder.encode(request.password))
        val user = TestFixtureFactory.user(
            email = request.email,
            password = encodedPassword
        )
        `when`(userRepository.findByEmail(request.email)).thenReturn(Optional.of(user))

        val result = authService.login(request)

        assertFalse(result.accessToken.isBlank())
        assertEquals(request.email, jwtTokenProvider.getEmail(result.accessToken))
    }

    @Test
    fun `login은 비밀번호가 다르면 실패 예외를 확인한다`() {
        val savedUser = TestFixtureFactory.user(
            email = "tester@example.com",
            password = requireNotNull(passwordEncoder.encode("password123"))
        )
        val wrongPasswordRequest = TestFixtureFactory.loginRequest(
            email = "tester@example.com",
            password = "wrong-password"
        )
        `when`(userRepository.findByEmail(wrongPasswordRequest.email)).thenReturn(Optional.of(savedUser))

        assertThrows(InvalidCredentialsException::class.java) {
            authService.login(wrongPasswordRequest)
        }
    }

    @Test
    fun `TODO signUp 또는 getCurrentUser의 리팩토링 포인트를 검증하는 테스트를 추가한다`() {
        // TODO 1. signUp 시 이메일 정규화 저장을 검증해보세요.
        // TODO 2. 또는 현재 사용자 조회 실패 예외를 더 설명적으로 바꾸고 그 테스트를 추가해보세요.
    }
}
