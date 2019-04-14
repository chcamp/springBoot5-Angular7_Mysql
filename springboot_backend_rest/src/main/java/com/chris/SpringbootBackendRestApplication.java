package com.chris;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application.properties")
public class SpringbootBackendRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendRestApplication.class, args);
	}

}

