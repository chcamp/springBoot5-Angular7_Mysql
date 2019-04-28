package com.chris.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chris.models.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long>{
	
	
}
