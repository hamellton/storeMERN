import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../organisms/RegisterForm/RegisterForm";
import { sendRequest } from "../../utils/api";
import useDevice from "../../hooks/useDevice";

jest.mock("../../hooks/useDevice");
jest.mock("../../utils/api");

describe("RegisterForm component", () => {
  it("displays the registration form", () => {
    (useDevice as jest.Mock).mockReturnValue({ device: "desktop" });

    render(<RegisterForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    (useDevice as jest.Mock).mockReturnValue({ device: "desktop" });

    const mockSendRequest = sendRequest as jest.Mock;
    mockSendRequest.mockResolvedValue({
      status: 201,
      data: { message: "Registration successful" },
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(mockSendRequest).toHaveBeenCalledTimes(1);
    });
  });
});
