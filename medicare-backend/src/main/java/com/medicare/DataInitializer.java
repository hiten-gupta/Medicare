package com.medicare;

import com.medicare.model.User;
import com.medicare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {

        // Delete old admin if exists
        userRepository.findByEmail("admin@medicare.com")
                .ifPresent(user -> userRepository.delete(user));

        // Create fresh admin with properly encoded password
        User admin = new User();
        admin.setName("Admin User");
        admin.setEmail("admin@medicare.com");
        admin.setPassword(passwordEncoder.encode("admin123")); // ← Spring encodes this
        admin.setRole(User.Role.ADMIN);
        userRepository.save(admin);

        System.out.println("✅ Admin user created: admin@medicare.com / admin123");
    }
}