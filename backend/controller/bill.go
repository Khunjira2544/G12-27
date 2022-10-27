package controller

import (
	"github.com/Khunjira2544/sa-65-project/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /users

func CreateBill(c *gin.Context) {

	var bill entity.Bill

	//เพิ่ม
	var payment entity.Payment
	var officer entity.Officer

	if err := c.ShouldBindJSON(&bill); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	//เพิ่ม
	if tx := entity.DB().Where("payment_id = ?", bill.Payment_ID).First(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment type not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", bill.OfficerID).First(&officer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "officer not found"})
		return
	}
	//เพิ่ม

	b := entity.Bill{
		Bill_ID:             bill.Bill_ID,
		Datetimepay:         bill.Datetimepay,
		Bill_StudentID:      bill.Bill_StudentID,
		Bill_RegistrationID: bill.Bill_RegistrationID,
		Payment:             payment, // โยงความสัมพันธ์กับ Entity Payment
		Officer:             officer, // โยงความสัมพันธ์กับ Entity User
		Total:               bill.Total,
	}

	if err := entity.DB().Create(&b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": b})

}

// GET /user/:id

func GetBill(c *gin.Context) {

	var bill entity.Bill

	id := c.Param("bill_id")

	if err := entity.DB().Raw("SELECT * FROM bills WHERE bill_id = ?", id).Scan(&bill).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// GET /users

// GET /users

func ListBills(c *gin.Context) {

	var bills []entity.Bill

	if err := entity.DB().Preload("Officer").Preload("Payment").Raw("SELECT * FROM bills").Find(&bills).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bills})

}

// Get previous bill id
// GET /previous_bill
func GetPreviousBill(c *gin.Context) {
	var bill entity.Bill
	if err := entity.DB().Last(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}
