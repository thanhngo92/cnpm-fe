import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fffdfd_0%,#fff8fb_26%,#fdf2f7_58%,#f9edf3_100%)]">
      {/* nền sáng rất nhẹ */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.18)_100%)]" />

      {/* glow lớn tạo chiều sâu */}
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[rgba(244,196,220,0.22)] blur-3xl" />
      <div className="absolute right-[-6rem] top-[4%] h-96 w-96 rounded-full bg-[rgba(255,255,255,0.8)] blur-3xl" />
      <div className="absolute left-1/2 top-[10%] h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(252,233,243,0.55)_40%,rgba(252,233,243,0)_74%)] blur-2xl" />
      <div className="absolute bottom-[-4rem] left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[rgba(238,189,214,0.16)] blur-3xl" />

      {/* lớp không gian mềm */}
      <div className="absolute inset-0 [perspective:1400px]">
        {/* layer 1 */}
        <div className="absolute left-[7%] top-[14%] h-52 w-40 rotate-[-8deg] rounded-[2.5rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,244,249,0.22)_100%)] shadow-[0_18px_45px_rgba(225,170,198,0.10)] backdrop-blur-[14px]" />

        {/* layer 2 */}
        <div className="absolute left-[18%] top-[30%] h-64 w-48 rotate-[6deg] rounded-[3rem] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(252,236,244,0.18)_100%)] shadow-[0_20px_50px_rgba(225,170,198,0.08)] backdrop-blur-[16px]" />

        {/* layer 3 */}
        <div className="absolute right-[10%] top-[16%] h-56 w-44 rotate-[8deg] rounded-[2.75rem] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.38)_0%,rgba(250,236,244,0.16)_100%)] shadow-[0_18px_45px_rgba(225,170,198,0.09)] backdrop-blur-[14px]" />

        {/* layer 4 */}
        <div className="absolute right-[18%] top-[36%] h-72 w-52 rotate-[-6deg] rounded-[3rem] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.32)_0%,rgba(249,231,240,0.14)_100%)] shadow-[0_24px_60px_rgba(225,170,198,0.08)] backdrop-blur-[16px]" />

        {/* layer 5 nhỏ để tạo nhịp */}
        <div className="absolute left-1/2 top-[12%] h-28 w-28 -translate-x-1/2 rotate-[10deg] rounded-[2rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(252,238,245,0.18)_100%)] shadow-[0_14px_36px_rgba(225,170,198,0.08)] backdrop-blur-[12px]" />

        {/* shape mềm bổ trợ */}
        <div className="absolute left-[30%] bottom-[18%] h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55)_0%,rgba(248,221,235,0.20)_48%,rgba(248,221,235,0)_76%)] blur-xl" />
        <div className="absolute right-[28%] bottom-[22%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,rgba(243,205,225,0.18)_46%,rgba(243,205,225,0)_75%)] blur-xl" />
      </div>

      {/* lớp làm nền dịu hơn ở đáy, không quá tối */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(240,225,233,0.22)_50%,rgba(228,205,216,0.38)_100%)]" />

      {/* viền sáng rất mảnh */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,rgba(226,177,202,0)_0%,rgba(208,143,177,0.5)_50%,rgba(226,177,202,0)_100%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
