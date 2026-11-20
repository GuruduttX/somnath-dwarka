import { compareSaved } from "./restType";
import { SiteError, type ContentType, type Doc } from "./types";
import type { DatasetDef } from "@/src/lib/datasets/types";
import {
  DatasetError,
  createDatasetItem,
  deleteDatasetItem,
  getDatasetEntry,
  listDataset,
  updateDatasetItem,
} from "@/src/lib/datasets/api";
import { datasetTemplate } from "@/src/lib/datasets/store";

/* One code dataset (lib/datasets) as an MCP content type. */

function wrap<T>(fn: () => Promise<T>): Promise<T> {
  return fn().catch((err) => {
    if (err instanceof DatasetError) throw new SiteError(err.status, err.message);
    throw err;
  });
}

export function datasetType(def: DatasetDef): ContentType {
  const fields = Object.keys(datasetTemplate(def));
  return {
    key: def.id,
    label: def.label,
    description:
      `${def.description} Items are kept in the site's code and edited here one by one: list_items shows each item's id (its key: ` +
      `${def.keyFields.join(" + ")}) and status ('code' = as in code, 'edited', 'added', 'deleted'). Fields: ${fields.join(", ")} ` +
      "(get_item an existing item to see their shape). update_item: each field sent replaces the stored value whole; send a field as null to " +
      `put it back to its code value; key fields (${def.keyFields.join(", ")}) cannot change. ` +
      (def.allowCreate === false ? "New items cannot be added. " : "create_item adds a new item (fields left out are empty). ") +
      (def.allowDelete === false ? "" : "delete_item removes an item; a removed code item comes back with create_item using the same key. ") +
      "Text is plain unless the description says otherwise; tokens {{whatsapp}}, {{phone}}, {{email}}, ... work in any text.",
    list: () => wrap(() => listDataset(def)),
    get: (id) => wrap(() => getDatasetEntry(def, id)),
    create: (data) =>
      wrap(async () => {
        const saved = await createDatasetItem(def, data);
        return { id: String(saved._id), title: String((saved as Doc).title ?? saved._id), status: String(saved._status), ...(saved._path ? { path: saved._path } : {}) };
      }),
    update: (id, changes) =>
      wrap(async () => {
        const after = (await updateDatasetItem(def, id, changes)) as Doc;
        // A field sent as null shows its code value afterwards, which counts as saved.
        const sent = Object.fromEntries(Object.entries(changes).filter(([, v]) => v !== null));
        const result = compareSaved(String(after._id), String(after.title ?? after._id), sent, after);
        result.saved.push(...Object.keys(changes).filter((k) => changes[k] === null));
        return result;
      }),
    remove: (id) => wrap(() => deleteDatasetItem(def, id)),
  };
}
