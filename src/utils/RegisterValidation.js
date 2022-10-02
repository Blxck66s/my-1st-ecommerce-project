import validator from "validator";

function RegisterValidation(input) {
  let errors = {};

  if (validator.isEmpty(input.firstName, { ignore_whitespace: true })) {
    errors.firstName = "ชื่อ เว้นว่างไม่ได้";
  }
  if (validator.isEmpty(input.lastName, { ignore_whitespace: true })) {
    errors.lastName = "นามสกุล เว้นว่างไม่ได้";
  }
  if (!validator.isEmail(input.email)) {
    errors.email = "อีเมล ไม่ถูกต้อง";
  }
  if (validator.isEmpty(input.email, { ignore_whitespace: true })) {
    errors.email = "อีเมล เว้นว่างไม่ได้";
  }
  if (!validator.isMobilePhone(input.mobile, ["th-TH"])) {
    errors.mobile = "เบอร์ ไม่ถูกต้อง";
  }
  if (validator.isEmpty(input.mobile, { ignore_whitespace: true })) {
    errors.mobile = "เบอร์ เว้นว่างไม่ได้";
  }
  if (validator.isEmpty(input.username, { ignore_whitespace: true })) {
    errors.username = "username เว้นว่างไม่ได้";
  }
  if (!validator.isAlphanumeric(input.password)) {
    errors.password = "รหัสผ่าน ต้องเป็นตัวอักษรหรือตัวเลขเท่านั้น";
  }
  if (!validator.isLength(input.password, { min: 6, max: 30 })) {
    errors.password = "รหัสผ่าน ต้องมีความยาวระหว่าง 6 - 30 ตัวอักษร";
  }
  if (validator.isEmpty(input.password, { ignore_whitespace: true })) {
    errors.password = "รหัสผ่าน เว้นว่างไม่ได้";
  }
  if (!validator.equals(input.confirmPassword, input.password)) {
    errors.confirmPassword = "ยืนยันรหัสผ่าน ไม่ตรงกับรหัสผ่าน";
  }
  if (validator.isEmpty(input.confirmPassword, { ignore_whitespace: true })) {
    errors.confirmPassword = "ยืนยันรหัสผ่าน เว้นว่างไม่ได้";
  }
  return errors;
}

export default RegisterValidation;
