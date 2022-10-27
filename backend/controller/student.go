package controller

import (
	"net/http"

	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

// GET /subject/:id
func GetStudent(c *gin.Context) {
	var student entity.Student
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "officer not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": student})
}

// GET /watch_videos
func ListStudent(c *gin.Context) {
	var student []entity.Student
	if err := entity.DB().Preload("Officer").Preload("Collegeyear").Preload("Faculty").Preload("Teacher").Raw("SELECT * FROM students").Find(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": student})
}

// DELETE /watch_videos/:id
func DeleteStudent(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM students WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /watch_videos
func UpdateStudent(c *gin.Context) {
	var student entity.Student
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", student.ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	if err := entity.DB().Save(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": student})
}
