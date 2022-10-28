package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65-project.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	//Migrete the schema
	database.AutoMigrate(
		&Officer{},
		&Collegeyear{},
		&Faculty{},
		&Teacher{},
		&Student{},
		//bill
		&Bill{},
		&Payment{},
		//Subject
		&Time{},
		&Subject{},
		//Teacher
		&Prefix{},
		&Educational{},
		//Registration
		&State{},
		&Registration{},

		//ของภีม Teacher_assessment
		&Teacher_assessment{},
		&Teaching_duration{},
		&Content_difficulty_level{},
		&Content_quality{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	password2, err := bcrypt.GenerateFromPassword([]byte("2345"), 14)

	db.Model(&Officer{}).Create(&Officer{
		Name:     "Pratchaya",
		Email:    "pratchaya@gmail.com",
		Password: string(password),
	})
	db.Model(&Officer{}).Create(&Officer{
		Name:     "Sanploy",
		Email:    "sanploy@gmail.com",
		Password: string(password2),
	})

	var Pratchaya Officer
	var Sanploy Officer
	db.Raw("SELECT * FROM officers WHERE email = ?", "pratchaya@gmail.com").Scan(&Pratchaya)
	db.Raw("SELECT * FROM officers WHERE email = ?", "sanploy@gmail.com").Scan(&Sanploy)

	// Resolution Data    // ของเรา Faculty Data
	science := Faculty{
		Name: "สำนักวิชาวิทยาศาสตร์",
	}
	db.Model(&Faculty{}).Create(&science)

	agricultural_technology := Faculty{
		Name: "สำนักวิชาเทคโนโลยีการเกษตร",
	}
	db.Model(&Faculty{}).Create(&agricultural_technology)

	socialtechnology := Faculty{
		Name: "สำนักวิชาเทคโนโลยีสังคม",
	}
	db.Model(&Faculty{}).Create(&socialtechnology)

	engineering := Faculty{
		Name: "สำนักวิชาวิศวกรรมศาสตร์",
	}
	db.Model(&Faculty{}).Create(&engineering)

	medicine := Faculty{
		Name: "สำนักวิชาแพทย์ศาสตร์",
	}
	db.Model(&Faculty{}).Create(&medicine)

	Nursing := Faculty{
		Name: "สำนักวิชาพยาบาลศาสตร์",
	}
	db.Model(&Faculty{}).Create(&Nursing)

	Dentist := Faculty{
		Name: "สำนักวิชาทันตแพทย์ศาสตร์",
	}
	db.Model(&Faculty{}).Create(&Dentist)

	//     // ของเรา collegeyear  Collegeyear Data
	P1 := Collegeyear{
		Name: "ปี 1",
	}
	db.Model(&Collegeyear{}).Create(&P1)

	P2 := Collegeyear{
		Name: "ปี 2",
	}
	db.Model(&Collegeyear{}).Create(&P2)

	P3 := Collegeyear{
		Name: "ปี 3",
	}
	db.Model(&Collegeyear{}).Create(&P3)

	P4 := Collegeyear{
		Name: "ปี 4",
	}
	db.Model(&Collegeyear{}).Create(&P4)

	T001 := Time{
		Period: "8.00-9.00น.(1)",
	}
	db.Model(&Time{}).Create(&T001)

	T002 := Time{
		Period: "8.00-10.00น.(2)",
	}
	db.Model(&Time{}).Create(&T002)

	T003 := Time{
		Period: "8.00-11.00น.(3)",
	}
	db.Model(&Time{}).Create(&T003)

	T004 := Time{
		Period: "8.00-12.00น.(4)",
	}
	db.Model(&Time{}).Create(&T004)
	T005 := Time{
		Period: "9.00-10.00น.(1)",
	}
	db.Model(&Time{}).Create(&T005)

	T006 := Time{
		Period: "9.00-12.00น.(2)",
	}
	db.Model(&Time{}).Create(&T006)

	T007 := Time{
		Period: "10.00-11.00น.(1)",
	}
	db.Model(&Time{}).Create(&T007)

	T008 := Time{
		Period: "10.00-12.00น.(2)",
	}
	db.Model(&Time{}).Create(&T008)
	T009 := Time{
		Period: "11.00-12.00น.(1)",
	}
	db.Model(&Time{}).Create(&T009)

	T010 := Time{
		Period: "13.00-14.00น.(1)",
	}
	db.Model(&Time{}).Create(&T010)

	T011 := Time{
		Period: "13.00-15.00น.(2)",
	}
	db.Model(&Time{}).Create(&T011)

	T012 := Time{
		Period: "13.00-16.00น.(3)",
	}
	db.Model(&Time{}).Create(&T012)

	T013 := Time{
		Period: "14.00-15.00น.(1)",
	}
	db.Model(&Time{}).Create(&T013)

	T014 := Time{
		Period: "14.00-16.00น.(2)",
	}
	db.Model(&Time{}).Create(&T014)

	T015 := Time{
		Period: "15.00-16.00น.(1)",
	}
	db.Model(&Time{}).Create(&T015)

	T016 := Time{
		Period: "16.00-17.00น.(1)",
	}
	db.Model(&Time{}).Create(&T016)

	T017 := Time{
		Period: "17.00-18.00น.(1)",
	}
	db.Model(&Time{}).Create(&T017)

	T018 := Time{
		Period: "17.00-19.00น.(2)",
	}
	db.Model(&Time{}).Create(&T018)
	T019 := Time{
		Period: "17.00-20.00น.(3)",
	}
	db.Model(&Time{}).Create(&T019)

	T020 := Time{
		Period: "18.00-19.00น.(1)",
	}
	db.Model(&Time{}).Create(&T020)

	T021 := Time{
		Period: "18.00-20.00น.(2)",
	}
	db.Model(&Time{}).Create(&T021)

	T022 := Time{
		Period: "19.00-20.00น.(3)",
	}
	db.Model(&Time{}).Create(&T022)
	T023 := Time{
		Period: "10.00-16.00น.(8)",
	}
	db.Model(&Time{}).Create(&T023)

	// --- Video Data  // ของเรา Teacher Data
	// T5001 := Teacher{
	// 	Name:    "สมชาย ทันสมัย",
	// 	Faculty: engineering,
	// }
	// db.Model(&Teacher{}).Create(&T5001)

	// T5002 := Teacher{
	// 	Name:    "สมหญิง จุลทล",
	// 	Faculty: science,
	// }
	// db.Model(&Teacher{}).Create(&T5002)

	// T5003 := Teacher{
	// 	Name:    "มาสาย ประจำ",
	// 	Faculty: engineering,
	// }
	// db.Model(&Teacher{}).Create(&T5003)

	//bill
	Payment_ID1 := Payment{
		Payment_ID:    "PM01",
		Name:          "ธนาคารกสิกรไทย",
		Accountnumber: "741-326985-5",
	}
	db.Model(&Payment{}).Create(&Payment_ID1)
	//--------------

	Payment_ID2 := Payment{
		Payment_ID:    "PM02",
		Name:          "ธนาคารไทยพานิชย์",
		Accountnumber: "049-547213-5",
	}
	db.Model(&Payment{}).Create(&Payment_ID2)
	//--------------

	Payment_ID3 := Payment{
		Payment_ID:    "PM03",
		Name:          "ธนาคารกรุงไทย",
		Accountnumber: "924-336412-8",
	}
	db.Model(&Payment{}).Create(&Payment_ID3)

	

	duration_one := Teaching_duration{
		Description: "ใช้เวลานานเกินไปในการสอน",
	}
	db.Model(&Teaching_duration{}).Create(&duration_one)

	duration_two := Teaching_duration{
		Description: "มีการใช้เวลาบางเนื้อหานานเกินไป",
	}
	db.Model(&Teaching_duration{}).Create(&duration_two)

	duration_three := Teaching_duration{
		Description: "เวลาเหมาะสมกับเนื้อหาที่เรียน",
	}
	db.Model(&Teaching_duration{}).Create(&duration_three)

	//content_quality data

	quality_one := Content_quality{
		Description: "เนื้อหาควรที่จะมีการอัพเดต",
	}
	db.Model(&Content_quality{}).Create(&quality_one)

	quality_two := Content_quality{
		Description: "เนื้อหาอยู่ในระดับปกติ",
	}
	db.Model(&Content_quality{}).Create(&quality_two)

	quality_three := Content_quality{
		Description: "เนื้อหามีความเหมาะสมกับรายวิชา",
	}
	db.Model(&Content_quality{}).Create(&quality_three)

	//content difficulty level data

	difficulty_one := Content_difficulty_level{
		Description: "ยากเกินไป",
	}
	db.Model(&Content_difficulty_level{}).Create(&difficulty_one)

	difficulty_two := Content_difficulty_level{
		Description: "พอใช้",
	}
	db.Model(&Content_difficulty_level{}).Create(&difficulty_two)

	difficulty_three := Content_difficulty_level{
		Description: "เหมาะสม",
	}
	db.Model(&Content_difficulty_level{}).Create(&difficulty_three)

	difficulty_four := Content_difficulty_level{
		Description: "เข้าใจง่าย",
	}
	db.Model(&Content_difficulty_level{}).Create(&difficulty_four)

	Prefix_1 := Prefix{
		Name: "อ.",
	}
	db.Model(&Prefix{}).Create(&Prefix_1)

	Prefix_2 := Prefix{
		Name: "อ. ดร.",
	}
	db.Model(&Prefix{}).Create(&Prefix_2)

	Prefix_3 := Prefix{
		Name: "ศ. ดร.",
	}
	db.Model(&Prefix{}).Create(&Prefix_3)

	Prefix_4 := Prefix{
		Name: "ผศ. ดร.",
	}
	db.Model(&Prefix{}).Create(&Prefix_4)

	Prefix_5 := Prefix{
		Name: "รศ. ดร.",
	}
	db.Model(&Prefix{}).Create(&Prefix_5)

	Prefix_6 := Prefix{
		Name: "Asst. Prof.",
	}
	db.Model(&Prefix{}).Create(&Prefix_6)

	Prefix_7 := Prefix{
		Name: "Assoc. Prof.",
	}
	db.Model(&Prefix{}).Create(&Prefix_7)

	Prefix_8 := Prefix{
		Name: " Prof.",
	}
	db.Model(&Prefix{}).Create(&Prefix_8)

	Educational_1 := Educational{
		Name: "ปริญญาโท",
	}
	db.Model(&Educational{}).Create(&Educational_1)

	Educational_2 := Educational{
		Name: "ปริญญาเอก",
	}
	db.Model(&Educational{}).Create(&Educational_2)

	//Status
	StateOnline := State{
		Name: "Online",
	}
	db.Model(&State{}).Create(&StateOnline)

	StateOnsite := State{
		Name: "Onsite",
	}
	db.Model(&State{}).Create(&StateOnsite)

}
