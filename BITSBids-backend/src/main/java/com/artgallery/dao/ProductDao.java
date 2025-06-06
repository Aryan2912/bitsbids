package com.artgallery.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.artgallery.model.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
	
	List<Product> findByCategoryId(int category);
	List<Product> findByStatusInAndEndDateBetween(List<String> status, String startTime, String endTime);
	List<Product> findByActiveStatus(String status);
	List<Product> findByCategoryIdAndActiveStatus(int category, String status);
	List<Product> findByTitle(String searchQuery);

}
