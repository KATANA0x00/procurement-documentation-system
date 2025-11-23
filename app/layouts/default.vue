<template>
    <nav class="navContainer">
        <div class="left">
            <img
                src="~/assets/logo.png"
                alt="logo-kmitl-main"
                class="logo"
                @click="navigateTo('/')"
            />

            <ul>
                <li
                    v-if="profileData?.user_level >= 2"
                    :class="{ active: route.path === '/auth/admin' }"
                >
                    <NuxtLink to="/auth/admin">เอกสารเข้า</NuxtLink>
                </li>
                <li :class="{ active: route.path === '/auth' }">
                    <NuxtLink to="/auth">ระบบเอกสาร</NuxtLink>
                </li>
                <!-- <li>
                    <NuxtLink to="/">ติดตามครุภัณฑ์</NuxtLink>
                </li> -->
            </ul>
        </div>

        <div class="navUser">
          <div class="left">
            <ul>
                <li
                    v-if="profileData?.user_level >= 3"
                    :class="{ active: route.path === '/auth/superadmin' }"
                >
                    <NuxtLink to="/auth/superadmin"
                    style="display: flex;align-items: center; gap: 5px;"
                        ><Icon name="lucide:chart-pie" size="1.3rem" :style="(route.path === '/auth/superadmin') ? 'color: var(--color-orange)': ''"/>
                        สรุปผล</NuxtLink
                    >
                </li>
            </ul>
          </div>

            <div>
                <div class="name">
                    {{ profileData.name }}
                </div>
                <div class="department">
                    สังกัด {{ profileData.department_name }}
                </div>
            </div>
            <button @click="onLogout">
                <Icon name="solar:logout-linear" size="2em" />
            </button>
        </div>
    </nav>
    <div class="container">
        <slot />
    </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const userInfo = useState("userInfo");

const profileData = userInfo.value;

async function onLogout() {
    try {
        const response = await $fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        if (response.isLoggedOut) {
            useCookie("ProcurementAuth").value = null;
            await router.push("/login"); // soft redirect
            router.go(0); // forces middleware re-run / reload
        }
    } catch (err) {
        console.error("Logout failed:", err);
    }
}
</script>

<style scoped>
.navContainer {
    height: 5em;
    box-shadow: 0px 1px 10px 1px var(--color-orange);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;

    position: sticky;
    top: 0;
    z-index: 1;
    background-color: var(--color-theme);

    .left {
        display: flex;
        align-items: center;

        img {
            width: 6.3em;
            transform: translateY(20%);
        }

        ul {
            display: flex;
            justify-content: start;
            list-style-type: none;

            li {
                margin: 0 20px;

                a {
                    text-decoration: none;
                    font-size: 20px;
                    font-weight: 400;
                }

                @media (max-width: 1366px) {
                    a {
                        font-size: 16px;
                    }
                }

                a:hover {
                    color: var(--color-orange);
                    text-decoration: underline;
                }
            }

            .active {
                a {
                    color: var(--color-orange);
                    font-weight: 600;
                }
            }
        }
    }

    .navUser {
        display: flex;
        justify-content: end;
        align-items: center;
        position: relative;

        div {
            padding-right: 7px;

            div {
                display: flex;
                justify-content: end;
            }
        }

        button {
            display: flex;
            right: 0;
            padding: 0.5em;
            border: none;
            background-color: transparent;
            border-radius: 12px;
            align-items: center;
        }

        button:hover {
            background-color: var(--color-sub-mid);
        }
    }
}

.container {
    width: 80vw;
    margin: 30px auto;
}

.name {
    font-weight: 600;
    font-size: 20px;
    color: var(--color-orange);
}

@media (max-width: 1366px) {
    .name {
        font-size: 16px;
    }

    .department {
        font-size: 12px;
    }
}

.specialLink {
    a {
        text-decoration: none;
        font-size: 20px;
        font-weight: 400;
    }

    @media (max-width: 1366px) {
        a {
            font-size: 16px;
        }
    }

    a:hover {
        color: var(--color-orange);
        text-decoration: underline;
    }

    .active {
        a {
            color: var(--color-orange);
            font-weight: 600;
        }
    }
}
</style>
