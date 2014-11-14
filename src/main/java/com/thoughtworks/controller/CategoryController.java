package com.thoughtworks.controller;

import com.thoughtworks.entity.Category;
import com.thoughtworks.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryServiceImpl;

    @RequestMapping( method = RequestMethod.GET)
    public List<Category> getCategories() {
        return categoryServiceImpl.getCategories();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Category getCategory(@PathVariable int id) {
        return categoryServiceImpl.getCategory(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable int id) {
        categoryServiceImpl.deleteCategory(id);
    }

    @RequestMapping( method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addCategory(@RequestBody Category category) {
        categoryServiceImpl.addCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void modifyCategory(@PathVariable int id, @RequestBody Category category) {
        category.setId(id);
        categoryServiceImpl.modifyCategory(category);
    }

}
