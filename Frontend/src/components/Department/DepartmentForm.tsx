import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  Button,
} from "antd";

import type { Department } from "../../types/department";

export type DepartmentFormValues =
  Omit<Department, "_id">;

interface DepartmentFormProps {
  initialValues?: DepartmentFormValues;
  onSubmit: (
    values: DepartmentFormValues
  ) => Promise<void>;
  submitText: string;
}

const validationSchema = Yup.object({
  departmentId: Yup.string()
    .required("Department ID is required"),

  name: Yup.string()
    .required("Department name is required")
    .min(
      2,
      "Department name must be at least 2 characters"
    ),

  description: Yup.string(),

  status: Yup.string()
    .oneOf(["Active", "Inactive"])
    .required("Status is required"),
});

const defaultValues: DepartmentFormValues = {
  departmentId: "",
  name: "",
  description: "",
  status: "Active",
};

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  initialValues = defaultValues,
  onSubmit,
  submitText,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({
        values,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>

          {/* Department ID */}
          <div style={{ marginBottom: 16 }}>
            <label>
              Department ID
            </label>

            <Field
              as={Input}
              name="departmentId"
              placeholder="DEPT001"
            />

            <ErrorMessage
              name="departmentId"
              component="div"
            />
          </div>

          {/* Department Name */}
          <div style={{ marginBottom: 16 }}>
            <label>
              Department Name
            </label>

            <Field
              as={Input}
              name="name"
              placeholder="Engineering"
            />

            <ErrorMessage
              name="name"
              component="div"
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: 16 }}>
            <label>
              Description
            </label>

            <Field
              as={Input.TextArea}
              name="description"
              rows={3}
              placeholder="Department description"
            />

            <ErrorMessage
              name="description"
              component="div"
            />
          </div>

          {/* Status */}
          <div style={{ marginBottom: 16 }}>
            <label>
              Status
            </label>

            <Select
              value={values.status}
              style={{ width: "100%" }}
              onChange={(value) =>
                setFieldValue(
                  "status",
                  value
                )
              }
              options={[
                {
                  label: "Active",
                  value: "Active",
                },
                {
                  label: "Inactive",
                  value: "Inactive",
                },
              ]}
            />

            <ErrorMessage
              name="status"
              component="div"
            />
          </div>

          {/* Submit */}
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
          >
            {submitText}
          </Button>

        </Form>
      )}
    </Formik>
  );
};

export default DepartmentForm;