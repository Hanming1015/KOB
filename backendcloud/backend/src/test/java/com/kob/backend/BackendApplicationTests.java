package com.kob.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class BackendApplicationTests {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void contextLoads() {
        // 打印出加密后的字符串
        System.out.println(passwordEncoder.encode("123456"));
    }
}
