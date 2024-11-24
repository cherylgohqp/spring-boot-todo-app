package com.example.backendapplication.service;

import com.example.backendapplication.security.dto.RegistrationRequest;

public interface IUserValidationService {
    void validateUser(RegistrationRequest registrationRequest);
}
