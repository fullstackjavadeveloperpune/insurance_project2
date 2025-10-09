package com.fullstack.user.dto;

import com.fullstack.user.entity.User;
import lombok.Data;

@Data
public class UserLoginResponse extends CommonApiResponse {

	private User user;
	
	private String jwtToken;

}
