import React, { FC, ForwardedRef, useEffect, useRef } from 'react';

import { Formio } from 'formiojs';
import 'formiojs/dist/formio.form.css';

import { getAccessToken } from '$application/lib/auth/store';

import { FormProps } from '../Form';

export type Option = RequireAtLeastOne<{
  readOnly: boolean;
  hide: boolean;
}>;

export type FormIOWrapperProps = FormProps & {
  formInstanceRef: ForwardedRef<any>;
  options?: Option;
};

export const FormIOWrapper: FC<FormIOWrapperProps> = (props) => {
  const element = useRef<HTMLDivElement>(null);
  const formio = useRef<any>(undefined);
  const isMounted = useRef(true);
  useEffect(() => formio.current?.destroy(true), []);

  const createWebFormInstance = async (formConfig: any) => {
    const { options = {}, formInstanceRef, onChange, onSubmit } = props;

    Formio.registerPlugin(
      {
        staticRequest: (requestArgs: any) => {
          const header = new Headers({
            authorization: `bearer ${getAccessToken()}`,
          });
          return Promise.resolve(
            Formio.request(
              requestArgs.url,
              requestArgs.method,
              requestArgs.data,
              header,
              requestArgs.opts,
            ),
          );
        },
      },
      'overrideRequest',
    );
    const formioInstance = await Formio.createForm(element.current, formConfig, {
      noAlerts: true,
      ...options,
    });

    // register form events
    formioInstance.on('submit', onSubmit);
    formioInstance.on('change', onChange);

    formio.current = formioInstance;

    if (typeof formInstanceRef === 'function') {
      formInstanceRef(formioInstance);
    } else {
      // eslint-disable-next-line no-console
      console.error(
        'FormIO ref should be a function that will be called with form.io instance',
      );
    }
  };

  useEffect(() => {
    const createForm = async () => {
      await createWebFormInstance(props.formConfig);
      if (formio.current) {
        formio.current.form = props.formConfig;
        if (props.submission) {
          formio.current.submission = props.submission;
        }
      }
    };

    if (props.formConfig) {
      createForm();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.formConfig]);

  useEffect(() => {
    if (formio.current && props.submission && isMounted.current) {
      formio.current.submission = props.submission;
    }
    return () => {
      isMounted.current = false;
    };
  }, [props.submission]);

  return (
    <div id="bootstrap">
      <div ref={element} />
    </div>
  );
};

export default FormIOWrapper;
