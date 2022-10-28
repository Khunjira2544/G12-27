//Bill ของเพื่อน
import { PaymentsInterface } from "./IPayment"; //FK
import { OfficersInterface } from "./IOfficer";
import { SubjectsInterface } from "./ISubject";
import { StudentInterface } from "./IStudent";

export interface BillsInterface {
    Bill_ID?: number;
    //เพิ่ม
    StudentID?: number,
    Student?: StudentInterface;
    
    //เพิ่ม
    SubjectID?: number,
    Subject?: SubjectsInterface,
    
    
    Total?: number;

    //การรับ FK ของ Interface
    Payment_ID?:  string,
    Payment?: PaymentsInterface
	
    Datetimepay?: string;
    //FK
    Officer?: OfficersInterface;
    OfficerID?: number;  // foreignkey.ID?
    
	
}