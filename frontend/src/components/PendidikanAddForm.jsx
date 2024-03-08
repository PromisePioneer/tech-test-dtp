import React, { useEffect } from "react";
import { Input } from "@/components/ui/input.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { toast } from "@/components/ui/use-toast.js";

function PendidikanAddForm({ pendidikanForm, onPendidikanForm, formError }) {
  function handleChange(i, field, e) {
    const newPendidikanForm = pendidikanForm.map((item, index) => {
      if (i === index) {
        return { ...item, [field]: e };
      }
      return item;
    });
    onPendidikanForm(newPendidikanForm);
  }

  function addFormFields() {
    onPendidikanForm([
      ...pendidikanForm,
      {
        namaSekolah: "",
        jurusan: "",
        tahunMasuk: "",
        tahunLulus: "",
      },
    ]);
  }

  function addSpaceOnArrayString(str) {
    let kata = "";
    str.split("").forEach((str, index) => {
      if (str === str.toUpperCase() && index !== 0) {
        kata += " ";
      }
      kata += str.toLowerCase();
    });
    return kata;
  }

  function deleteFormFields(i) {
    let newPendidikanForm = [...pendidikanForm];
    newPendidikanForm.splice(i, 1);
    onPendidikanForm(newPendidikanForm);
  }

  return (
    <Card className="w-[800px] mb-4">
      <CardHeader>
        <CardTitle>Tambah Riwayat Pendidikan</CardTitle>
        <CardDescription>
          Mohon isi semua data dari formulir ini.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <CardContent>
          {pendidikanForm.map((el, i) => (
            <div key={i}>
              <div className="flex justify-end items-center mb-4">
                {i ? (
                  <Button
                    type="button"
                    size="sm"
                    className="button remove"
                    onClick={() => deleteFormFields(i)}
                    variant="destructive"
                  >
                    Hapus
                  </Button>
                ) : null}
              </div>
              <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                <div className="sm:col-span-12 mb-4">
                  {["namaSekolah", "jurusan", "tahunMasuk", "tahunLulus"].map(
                    (option, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-6 mb-4"
                      >
                        <Label>
                          {addSpaceOnArrayString(option).replace(
                            option.at(0),
                            option.at(0).toUpperCase(),
                          )}
                        </Label>
                        <Input
                          name={`pilihan-${option}-${i}`}
                          type="text"
                          className="w-[500px]"
                          value={el[option] || ""}
                          onChange={(e) =>
                            handleChange(i, option, e.target.value)
                          }
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
              <Separator className="h-5 w-full mb-3" />
            </div>
          ))}

          <div className="flex items-center justify-end gap-3">
            <Button type="button" size="sm" onClick={() => addFormFields()}>
              Tambah Soal
            </Button>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

export default PendidikanAddForm;
