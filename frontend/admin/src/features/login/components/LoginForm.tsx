import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Field from "../../../components/inputs/Field";
import FieldPassword from "../../../components/inputs/FieldPassword";
import Heading1 from "../../../components/texts/Heading1";
import Heading3 from "../../../components/texts/Heading3";
import Heading4 from "../../../components/texts/Heading4";
import SmallText from "../../../components/texts/SmallText";
import Card from "../../../components/ui/Card";
import Loader from "../../../components/ui/Loader";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm = () => {
    const { form, handleChange, handleSubmit, loading, error } = useLoginForm();

    return ( 
        <Card className="w-full z-10 p-4 md:w-1/2 md:max-w-[500px] shadow-2xl">
            <form onSubmit={handleSubmit}  className="space-y-4 w-full">
                <div className="text-center">
                    <Heading1>Welcome to NaturaSalud</Heading1>
                    <Heading3 className="text-muted dark:text-dark-muted">Log in to your account to continue</Heading3>
                </div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Email *</Heading4>
                        <Field
                            type="email"
                            name="email"
                            required
                            placeholder="user@naturasalud.com"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Password *</Heading4>
                        <FieldPassword
                            name="password"
                            required
                            placeholder="******"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && (
                        <SmallText className="text-sm text-error dark:text-dark-error">{error}</SmallText>
                    )}
                </div>
                <ButtonPrimary className="w-full mt-2 flex justify-center items-center" disabled={loading}>
                    {loading ? <Loader /> : <Heading4>Login</Heading4>}
                </ButtonPrimary>
            </form>
        </Card>
    );
}
 
export default LoginForm;