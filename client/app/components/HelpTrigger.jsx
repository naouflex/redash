import { get } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Tooltip from "@/components/Tooltip";
import Drawer from "antd/lib/drawer";
import Link from "@/components/Link";
import PlainButton from "@/components/PlainButton";
import CloseOutlinedIcon from "@ant-design/icons/CloseOutlined";
import DynamicComponent, { registerComponent } from "@/components/DynamicComponent";
import HelpDrawerContent from "@/pages/help/HelpDrawerContent";
import { helpHref, isHelpHref, parseHelpHref } from "@/pages/help/markdown";

import "./HelpTrigger.less";

export const TYPES = {
  HOME: ["", "Help"],
  VALUE_SOURCE_OPTIONS: ["/user-guide/querying/query-parameters#Value-Source-Options", "Guide: Value Source Options"],
  SHARE_DASHBOARD: ["/user-guide/dashboards/sharing-dashboards", "Guide: Sharing and Embedding Dashboards"],
  AUTHENTICATION_OPTIONS: ["/user-guide/users/authentication-options", "Guide: Authentication Options"],
  DS_ATHENA: ["/data-sources/amazon-athena-setup", "Guide: Help Setting up Amazon Athena"],
  DS_BIGQUERY: ["/data-sources/bigquery-setup", "Guide: Help Setting up BigQuery"],
  DS_URL: ["/data-sources/querying-urls", "Guide: Help Setting up URL"],
  DS_MONGODB: ["/data-sources/mongodb-setup", "Guide: Help Setting up MongoDB"],
  DS_GOOGLE_SPREADSHEETS: ["/data-sources/querying-a-google-spreadsheet", "Guide: Help Setting up Google Spreadsheets"],
  DS_GOOGLE_ANALYTICS: ["/data-sources/google-analytics-setup", "Guide: Help Setting up Google Analytics"],
  DS_AXIBASETSD: ["/data-sources/axibase-time-series-database", "Guide: Help Setting up Axibase Time Series"],
  DS_RESULTS: ["/user-guide/querying/query-results-data-source", "Guide: Help Setting up Query Results"],
  ALERT_SETUP: ["/user-guide/alerts/setting-up-an-alert", "Guide: Setting Up a New Alert"],
  MAIL_CONFIG: ["/open-source/setup#Mail-Configuration", "Guide: Mail Configuration"],
  ALERT_NOTIF_TEMPLATE_GUIDE: ["/user-guide/alerts/custom-alert-notifications", "Guide: Custom Alerts Notifications"],
  FAVORITES: ["/user-guide/querying/favorites-tagging#Favorites", "Guide: Favorites"],
  MANAGE_PERMISSIONS: [
    "/user-guide/querying/writing-queries#Managing-Query-Permissions",
    "Guide: Managing Query Permissions",
  ],
  NUMBER_FORMAT_SPECS: ["/user-guide/visualizations/formatting-numbers", "Formatting Numbers"],
  GETTING_STARTED: ["/user-guide/getting-started", "Guide: Getting Started"],
  DASHBOARDS: ["/user-guide/dashboards", "Guide: Dashboards"],
  QUERIES: ["/user-guide/querying", "Guide: Queries"],
  ALERTS: ["/user-guide/alerts", "Guide: Alerts"],
  MODELS: ["/user-guide/machine-learning", "Guide: Machine Learning"],
  MODEL_SETUP: ["/user-guide/machine-learning", "Guide: Machine Learning"],
  MODEL_NOTIF_TEMPLATE_GUIDE: ["/user-guide/alerts/custom-alert-notifications", "Guide: Custom Notifications"],
};

function hrefFromTypeEntry(entry) {
  const [relative = ""] = entry || [];
  const [path, hash] = relative.split("#");
  return helpHref(path, hash);
}

const HelpTriggerPropTypes = {
  type: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.node,
  className: PropTypes.string,
  showTooltip: PropTypes.bool,
  renderAsLink: PropTypes.bool,
  children: PropTypes.node,
};

const HelpTriggerDefaultProps = {
  type: null,
  href: null,
  title: null,
  className: null,
  showTooltip: true,
  renderAsLink: false,
  children: <i className="fa fa-question-circle" aria-hidden="true" />,
};

export function helpTriggerWithTypes(types, _allowedDomains = [], drawerClassName = null) {
  return class HelpTrigger extends React.Component {
    static propTypes = {
      ...HelpTriggerPropTypes,
      type: PropTypes.oneOf(Object.keys(types)),
    };

    static defaultProps = HelpTriggerDefaultProps;

    state = {
      visible: false,
      currentHref: null,
    };

    getHref = () => {
      const helpTriggerType = get(types, this.props.type);
      if (helpTriggerType) {
        return hrefFromTypeEntry(helpTriggerType);
      }
      return this.props.href;
    };

    isInAppHelp = (href) => isHelpHref(href);

    openDrawer = (e) => {
      if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        this.setState({ visible: true, currentHref: this.getHref() });
      }
    };

    closeDrawer = (event) => {
      if (event) {
        event.preventDefault();
      }
      this.setState({ visible: false, currentHref: null });
    };

    navigateDrawer = (href) => {
      const parsed = parseHelpHref(href);
      this.setState({ currentHref: helpHref(parsed.path, parsed.hash) });
    };

    render() {
      const targetHref = this.getHref();
      if (!targetHref) {
        return null;
      }

      const tooltip = get(types, `${this.props.type}[1]`, this.props.title);
      const className = cx("help-trigger", this.props.className);
      const href = this.state.currentHref || targetHref;
      const shouldRenderAsLink = this.props.renderAsLink || !this.isInAppHelp(targetHref);
      const drawerLocation = parseHelpHref(href);

      return (
        <React.Fragment>
          <Tooltip
            title={
              this.props.showTooltip ? (
                <>
                  {tooltip}
                  {shouldRenderAsLink && (
                    <>
                      {" "}
                      <i className="fa fa-external-link" style={{ marginLeft: 5 }} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </>
                  )}
                </>
              ) : null
            }
          >
            <Link
              href={href}
              className={className}
              rel={shouldRenderAsLink ? "noopener noreferrer" : undefined}
              target={shouldRenderAsLink ? "_blank" : undefined}
              onClick={shouldRenderAsLink ? undefined : this.openDrawer}
            >
              {this.props.children}
            </Link>
          </Tooltip>
          <Drawer
            placement="right"
            closable={false}
            onClose={this.closeDrawer}
            open={this.state.visible}
            className={cx("help-drawer", drawerClassName)}
            destroyOnClose
            width={480}
          >
            <div className="drawer-wrapper">
              <div className="drawer-menu">
                {href && (
                  <Tooltip title="Open page in a new window" placement="left">
                    <Link href={href} target="_blank">
                      <i className="fa fa-external-link" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </Link>
                  </Tooltip>
                )}
                <Tooltip title="Close" placement="bottom">
                  <PlainButton onClick={this.closeDrawer}>
                    <CloseOutlinedIcon />
                  </PlainButton>
                </Tooltip>
              </div>

              <div className="help-drawer__body">
                <HelpDrawerContent
                  path={drawerLocation.path}
                  hash={drawerLocation.hash}
                  onNavigate={this.navigateDrawer}
                />
              </div>
            </div>

            <DynamicComponent name="HelpDrawerExtraContent" onLeave={this.closeDrawer} />
          </Drawer>
        </React.Fragment>
      );
    }
  };
}

registerComponent("HelpTrigger", helpTriggerWithTypes(TYPES));

export default function HelpTrigger(props) {
  return <DynamicComponent {...props} name="HelpTrigger" />;
}

HelpTrigger.propTypes = HelpTriggerPropTypes;
HelpTrigger.defaultProps = HelpTriggerDefaultProps;
