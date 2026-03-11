function getValueType(
  value: unknown,
): "number" | "boolean" | "string" | "array" | "object" | "null" | "undefined" {
  // Null ve undefined kontrolü
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  // Boolean değerleri direkt kontrol et
  if (typeof value === "boolean") {
    return "boolean";
  }

  // Number değerleri direkt döndür
  if (typeof value === "number") {
    return "number";
  }

  // String değerleri number'a çevirmeye çalış
  if (typeof value === "string") {
    const numValue = Number(value);
    // Boş string ve NaN kontrolü
    if (value !== "" && !Number.isNaN(numValue)) {
      return "number";
    }

    return "string";
  }

  // Array kontrolü (object'ten önce olmalı çünkü array'ler de object)
  if (Array.isArray(value)) {
    return "array";
  }

  // Object kontrolü
  if (typeof value === "object") {
    return "object";
  }

  // Fallback olarak string döndür
  return "string";
}

export default getValueType;
