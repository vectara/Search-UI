import { ChangeEventHandler, FormEventHandler } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  autoFocus?: boolean;
  onSubmit?: FormEventHandler;
};

export const VuiSearchInput = ({
  value,
  onChange,
  placeholder,
  autoFocus,
  onSubmit,
}: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="vuiSearchInput">
        <input
          className="vuiSearchInput__input"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <button className="vuiSearchInput__submitButton" onClick={onSubmit}>
          <BiSearch size="20px" />
        </button>
      </div>
    </form>
  );
};
