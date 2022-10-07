import validator from "validator";

function OrderValidation(input) {
  let errors = {};

  if (validator.isEmpty(input.receiverName, { ignore_whitespace: true })) {
    errors.receiverName = "ชื่อ เว้นว่างไม่ได้";
  }

  if (!validator.isMobilePhone(input.receiverPhone, ["th-TH"])) {
    errors.receiverPhone = "เบอร์ ไม่ถูกต้อง";
  }
  if (validator.isEmpty(input.receiverPhone, { ignore_whitespace: true })) {
    errors.receiverPhone = "เบอร์ เว้นว่างไม่ได้";
  }
  if (validator.isEmpty(input.detailedAddress, { ignore_whitespace: true })) {
    errors.detailedAddress = "ที่อยู่ เว้นว่างไม่ได้";
  }

  if (validator.isEmpty(input.subDistrict, { ignore_whitespace: true })) {
    errors.subDistrict = "แขวง/ตำบล เว้นว่างไม่ได้";
  }
  if (validator.isEmpty(input.district, { ignore_whitespace: true })) {
    errors.district = "เขต/อำเภอ เว้นว่างไม่ได้";
  }

  if (!validator.isNumeric(input.postalCode)) {
    errors.postalCode = "เลขไปรษณีย์ ต้องเป็นตัวเลขเท่านั้น";
  }
  if (validator.isEmpty(input.postalCode, { ignore_whitespace: true })) {
    errors.postalCode = "เลขไปรษณีย์ เว้นว่างไม่ได้";
  }

  if (validator.isEmpty(input.province, { ignore_whitespace: true })) {
    errors.province = "จังหวัด เว้นว่างไม่ได้";
  }
  if (validator.isEmpty(input.sendBy, { ignore_whitespace: true })) {
    errors.sendBy = "กรุณาเลือกวิธีการจัดส่งสินค้า";
  }

  return errors;
}

export default OrderValidation;
