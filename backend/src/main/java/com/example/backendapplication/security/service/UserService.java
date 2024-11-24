package com.example.backendapplication.security.service;

import com.example.backendapplication.model.User;
import com.example.backendapplication.security.dto.AuthenticatedUserDto;
import com.example.backendapplication.security.dto.RegistrationRequest;
import com.example.backendapplication.security.dto.RegistrationResponse;

/**
 * Created on Ağustos, 2020
 *
 * @author Faruk
 */
public interface UserService {

	User findByUsername(String username);

	RegistrationResponse registration(RegistrationRequest registrationRequest);

	AuthenticatedUserDto findAuthenticatedUserByUsername(String username);

}
