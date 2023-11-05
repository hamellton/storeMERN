import LoginForm from "../organisms/LoginForm/LoginForm";
import useDevice from "../../hooks/useDevice";
import { sendRequest } from "../../utils/api";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("../../hooks/useDevice");
jest.mock("../../utils/api");

describe("LoginForm component", () => {
  it("displays the login form", () => {
    (useDevice as jest.Mock).mockReturnValue({ device: "desktop" });

    render(<LoginForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    (useDevice as jest.Mock).mockReturnValue({ device: "desktop" });

    const mockSendRequest = sendRequest as jest.Mock;
    mockSendRequest.mockResolvedValue({
      status: 200,
      data: { token: "valid-token" },
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockSendRequest).toHaveBeenCalledTimes(1);
    });

    expect(localStorage.getItem("jwtToken")).toBe("valid-token");
  });
});
