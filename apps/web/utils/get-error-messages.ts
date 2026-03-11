/**
 * Backend'den gelen validation hatalarını Türkçe'ye çevirir
 *
 * KULLANIM ÖRNEĞİ 1 - Basit Field:
 * ================================
 * Backend: ["name must be shorter than or equal to 100 characters", "name should not be empty"]
 *
 * const fieldNames = {
 *   name: "İçerik Tipi Adı"
 * };
 *
 * Sonuç: ["İçerik Tipi Adı, 100 veya daha az karakter olmalıdır", "İçerik Tipi Adı boş bırakılamaz"]
 *
 *
 * KULLANIM ÖRNEĞİ 2 - Nested Field (Wildcard Pattern):
 * =====================================================
 * Backend: ["custom_fields.0.label should not be empty", "custom_fields.1.type must be a string"]
 *
 * const fieldNames = {
 *   "custom_fields.*.label": "Özel Alan #{index} - Etiket",
 *   "custom_fields.*.type": "Özel Alan #{index} - Tip"
 * };
 *
 * Sonuç: ["Özel Alan #1 - Etiket boş bırakılamaz", "Özel Alan #2 - Tip bir string olmalıdır"]
 *
 *
 * KULLANIM ÖRNEĞİ 3 - Nested Field (Parça Parça Çeviri):
 * =======================================================
 * Backend: ["custom_fields.0.label should not be empty"]
 *
 * const fieldNames = {
 *   custom_fields: "Özel Alanlar",
 *   label: "Etiket"
 * };
 *
 * Sonuç: ["Özel Alanlar - #1 - Etiket boş bırakılamaz"]
 */

const errorPatterns: Record<string, string> = {
  "must be shorter than or equal to {n} characters":
    "{name}, {n} veya daha az karakter olmalıdır",
  "should not be empty": "{name} boş bırakılamaz",
  "must be a string": "{name} bir string olmalıdır",
  "must be a number": "{name} bir sayı olmalıdır",
  "must be a boolean": "{name} bir boolean olmalıdır",
  "must be an array": "{name} bir array olmalıdır",
  "must be an object": "{name} bir obje olmalıdır",
  "must be a valid email": "{name} geçerli bir email adresi olmalıdır",
  "must be a valid URL": "{name} geçerli bir URL olmalıdır",
  "must be a valid phone number":
    "{name} geçerli bir telefon numarası olmalıdır",
  "must be a valid date": "{name} geçerli bir tarih olmalıdır",
  "must be a valid time": "{name} geçerli bir saat olmalıdır",
  "must be a valid date and time": "{name} geçerli bir tarih ve saat olmalıdır",
  "must be longer than or equal to {n} characters":
    "{name}, {n} veya daha fazla karakter olmalıdır",
  "must be greater than or equal to {n}":
    "{name}, {n} veya daha büyük olmalıdır",
  "must be less than or equal to {n}": "{name}, {n} veya daha küçük olmalıdır",
};

/**
 * Field adlarını Türkçe'ye çevirir
 */
const fieldNames = {
  id: "ID",
  name: "Adı",
  label: "Etiket",
  description: "Açıklama",
  title: "Başlık",
  slug: "Slug",
  color: "Renk",
  icon: "İkon",

  permission_type: "İzin Tipi",
  post_type_id: "İçerik Tipi",
  category_id: "Kategori",
  organization_id: "Organizasyon",
  object_id: "İçerik",
  creator_id: "Oluşturan",
  user_id: "Kullanıcı",
  permissionIds: "İzinler",
  category_ids: "Kategoriler",
  tag_ids: "Etiketler",
  author_id: "Yazar",

  parentId: "Üst Kategori",
  custom_field_values: "Özel Alanlar",
  custom_fields: "Özel Alanlar",
  start_date: "Başlangıç Tarihi",
  end_date: "Bitiş Tarihi",
  is_applause_enabled: "Alkış Özelliği",
  comments_enabled: "Yorumlar Etkin",
  require_approval: "Onay Gerekli",

  "custom_fields.*.label": "Özel Alan #{index} Etiket",
  "custom_fields.*.type": "Özel Alan #{index} Tip",
  "permissionIds.*": "İzin #{index}",
  "user_id.*": "Kullanıcı #{index}",
  "organization_id.*": "Organizasyon #{index}",
  "custom_field_values.*.field_id": "Özel Alan #{index} ID",
  "custom_field_values.*.value": "Özel Alan #{index} Değer",
  "custom_field_values.*.option_ids": "Özel Alan #{index} Seçenekler",
};

/**
 * Backend'den gelen error mesajından field adını ve pattern'i ayırır
 * Örnek: "name must be shorter than or equal to 100 characters"
 *         -> { fieldName: "name", pattern: "must be shorter than or equal to {n} characters", params: { n: "100" } }
 */
function parseErrorMessage(error: string): {
  fieldName: string;
  pattern: string;
  params: Record<string, string>;
} | null {
  // İlk kelime genelde field adıdır
  const parts = error.split(" ");
  const fieldName = parts[0];

  if (!fieldName) {
    return null;
  }

  const restMessage = parts.slice(1).join(" ");

  // errorPatterns'deki her pattern'i kontrol et
  for (const pattern of Object.keys(errorPatterns)) {
    // Pattern'deki {n} gibi parametreleri yakalayacak regex oluştur
    const regexPattern = pattern
      .replace(/\{n\}/g, "(\\d+)")
      .replace(/\{[^}]+\}/g, "(.+?)");

    const regex = new RegExp(`^${regexPattern}$`);
    const match = restMessage.match(regex);

    if (match) {
      // Parametreleri çıkar
      const params: Record<string, string> = {};
      const paramNames = pattern.match(/\{([^}]+)\}/g);

      if (paramNames) {
        paramNames.forEach((paramName, index) => {
          const cleanName = paramName.replace(/[{}]/g, "");
          const paramValue = match[index + 1];
          if (paramValue) {
            params[cleanName] = paramValue;
          }
        });
      }

      return { fieldName, pattern, params };
    }
  }

  return null;
}

/**
 * Nested field adlarını çevirir
 * Örnek: "custom_fields.0.label" → "Özel Alan #1 - Etiket"
 *
 * Desteklenen formatlar:
 * 1. Tam eşleşme: fieldNames["custom_fields.0.label"]
 * 2. Wildcard pattern: fieldNames["custom_fields.*.label"] → "Özel Alan #{index} - Etiket"
 * 3. Parça parça çeviri: "custom_fields" + "label" → "Özel Alanlar - Etiket"
 */
function translateFieldName(
  fieldName: string,
  fieldNames: Record<string, string>,
): string {
  // 1. Önce tam eşleşme kontrolü
  if (fieldNames[fieldName]) {
    return fieldNames[fieldName];
  }

  // 2. Nested field kontrolü (custom_fields.0.label gibi)
  if (fieldName.includes(".")) {
    const parts = fieldName.split(".");

    // Array index'lerini bul (sayısal parçalar)
    const indexes: Record<number, string> = {};
    parts.forEach((part, idx) => {
      if (/^\d+$/.test(part)) {
        indexes[idx] = part;
      }
    });

    // Wildcard pattern oluştur (custom_fields.0.label → custom_fields.*.label)
    const wildcardPattern = parts
      .map((part) => (/^\d+$/.test(part) ? "*" : part))
      .join(".");

    // Wildcard pattern'i ara
    if (fieldNames[wildcardPattern]) {
      let result = fieldNames[wildcardPattern];
      // {index} placeholder'larını doldur
      Object.values(indexes).forEach((indexValue) => {
        const displayIndex = String(Number(indexValue) + 1); // 0-based → 1-based
        result = result
          .replace("{index}", displayIndex)
          .replace("{i}", displayIndex);
      });
      return result;
    }

    // 3. Parça parça çeviri dene
    const translatedParts = parts.map((part) => {
      // Sayı ise "#N" formatında göster
      if (/^\d+$/.test(part)) {
        return `#${Number(part) + 1}`;
      }
      // Parçanın çevirisini ara
      return fieldNames[part] || part;
    });

    // Parçaları birleştir
    return translatedParts.join(" - ");
  }

  // 4. Hiçbir şey bulamazsa orijinal field adını döndür
  return fieldNames[fieldName] || fieldName;
}

/**
 * Template'deki placeholder'ları doldurur
 * Örnek: "{name}, {n} veya daha az karakter olmalıdır"
 *        -> "İçerik Tipi Adı, 100 veya daha az karakter olmalıdır"
 */
function fillTemplate(
  template: string,
  fieldName: string,
  params: Record<string, string>,
): string {
  let result = template.replace("{name}", fieldName);

  // Diğer parametreleri doldur
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`{${key}}`, value);
  }

  return result;
}

function getErrorMessages(errors: string[] | null | undefined): string[] {
  if (!errors) {
    return [];
  }

  return errors.map((error) => {
    const parsed = parseErrorMessage(error);

    if (!parsed) {
      // Eğer pattern eşleşmezse orijinal mesajı döndür
      return error;
    }

    const { fieldName, pattern, params } = parsed;

    // Field adını Türkçe'ye çevir (nested field desteği ile)
    const translatedFieldName = translateFieldName(fieldName, fieldNames);

    // Pattern'in Türkçe template'ini al
    const template = errorPatterns[pattern];

    if (!template) {
      return error;
    }

    // Template'i doldur
    return fillTemplate(template, translatedFieldName, params);
  });
}

export default getErrorMessages;
