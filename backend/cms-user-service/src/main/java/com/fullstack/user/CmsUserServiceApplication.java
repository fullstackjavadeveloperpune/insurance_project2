package com.fullstack.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fullstack.user.constants.DatabaseConstant.UserRole;
import com.fullstack.user.constants.DatabaseConstant.UserStatus;
import com.fullstack.user.entity.User;
import com.fullstack.user.service.UserService;

@SpringBootApplication
public class CmsUserServiceApplication implements CommandLineRunner {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(CmsUserServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		User irda = this.userService.getUserByEmailAndRole("irda@fullstackjavadeveloper.in", UserRole.IRDA.value());
		User insurance_company = this.userService.getUserByEmailAndRole("contact@fullstackjavadeveloper.in", UserRole.COMPANY.value());
		
		if(irda == null) {
			System.out.println("IRDA user not found");
			
			User default_irda = new User();
			default_irda.setEmailId("irda@fullstackjavadeveloper.in");
			default_irda.setPassword(passwordEncoder.encode("12345"));
			default_irda.setRole(UserRole.IRDA.value());
			default_irda.setStatus(UserStatus.ACTIVE.value());
			
			this.userService.registerUser(default_irda);
			
			System.out.println("default IRDA user added succesful!!!");
		}
		
		if(insurance_company == null) {
			System.out.println("insurance_company user not found");
			
			User default_irda = new User();
			default_irda.setEmailId("contact@fullstackjavadeveloper.in");
			default_irda.setPassword(passwordEncoder.encode("12345"));
			default_irda.setRole(UserRole.COMPANY.value());
			default_irda.setStatus(UserStatus.ACTIVE.value());
			
			this.userService.registerUser(default_irda);
			
			System.out.println("default insurance_company user added succesful!!!");
		}
		
	}

}
